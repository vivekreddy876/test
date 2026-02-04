**This GitHub Action workflow logs into Azure, retrieves image tags from a specified ACR repository sorted by date descending, lists them, and deletes all except the latest 4 (latest + top 3).** [learn.microsoft](https://learn.microsoft.com/en-us/cli/azure/acr/repository?view=azure-cli-latest)

It uses Azure CLI commands with `bash` for parsing JSON output via `jq`. [learn.microsoft](https://learn.microsoft.com/en-us/cli/azure/acr/repository?view=azure-cli-latest)

Configure these repository secrets: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`. Grant the service principal `AcrPush` and `AcrDelete` roles on the ACR. [github](https://github.com/Azure/login)

## Workflow YAML

Save as `.github/workflows/cleanup-acr.yml`:

```yaml
name: ACR Cleanup

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  workflow_dispatch:  # Manual trigger

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Login to Azure
      uses: azure/login@v2
      with:
        client-id: ${{ secrets.AZURE_CLIENT_ID }}
        tenant-id: ${{ secrets.AZURE_TENANT_ID }}
        subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

    - name: Cleanup ACR
      env:
        ACR_NAME: 'youracrname'  # Replace with your ACR name
        REPO_NAME: 'yourrepo'    # Replace with your repository
      run: |
        echo "Fetching tags sorted by date desc..."
        TAGS_JSON=$(az acr repository show-tags \
          --name $ACR_NAME \
          --repository $REPO_NAME \
          --detail \
          --orderby time_desc \
          --output json)

        echo "All tags (latest first):"
        echo $TAGS_JSON | jq -r '.[].name'

        TOP4_TAGS=$(echo $TAGS_JSON | jq -r -c '.[0:4][].name')
        KEEP_TAGS=($(echo $TOP4_TAGS))

        echo "Keeping latest 4 tags: ${KEEP_TAGS[*]}"

        OLD_TAGS=$(echo $TAGS_JSON | jq -r -c '.[4:][] | .name')
        echo "Deleting older tags..."
        echo $OLD_TAGS | tr ',' '\n' | while read tag; do
          if [[ -n "$tag" && "$tag" != "null" ]]; then
            echo "Deleting tag: $tag"
            az acr repository delete \
              --name $ACR_NAME \
              --image "${REPO_NAME}:${tag}" \
              --yes
          fi
        done
```

## Customization

**Adjust inputs:** Set `ACR_NAME` and `REPO_NAME` env vars for your registry/repository. For multiple repos, duplicate the step in a matrix. [learn.microsoft](https://learn.microsoft.com/en-us/cli/azure/acr/repository?view=azure-cli-latest)

**Parse logic:** `jq` extracts names from detailed JSON; slices first 4 to keep, rest for deletion. `--detail` enables date sorting. [github](https://github.com/Azure/azure-cli/issues/9708)

**Deletion:** Uses `--image` format for tag delete (keeps manifest if shared); add `--manifest` to purge layers too. [github](https://github.com/Azure/azure-cli/issues/4057)

## Testing

Run manually via GitHub UI. Check logs for tag lists and deletions. Verify with `az acr repository show-tags --detail --orderby time_desc`. [learn.microsoft](https://learn.microsoft.com/en-us/cli/azure/acr/repository?view=azure-cli-latest)
