#!/bin/bash

# Path to the .env.example file
ENV_FILE=".env.example"

# Create a temporary file to store the new contents
TEMP_FILE=$(mktemp)

# Read each line of the .env.example file
while IFS= read -r line; do
  # Check if the line starts with "DB_"
  if [[ $line == DB_* ]]; then
    # Extract the variable name
    VAR_NAME=$(echo $line | cut -d'=' -f1)
    # Get the value of the environment variable from the machine
    VAR_VALUE=$(printenv "$VAR_NAME")
    # If the environment variable is set, replace the line
    if [[ -n $VAR_VALUE ]]; then
      echo "$VAR_NAME=$VAR_VALUE" >> "$TEMP_FILE"
    else
      echo "$line" >> "$TEMP_FILE"
    fi
  else
    echo "$line" >> "$TEMP_FILE"
  fi
done < "$ENV_FILE"

# Overwrite the original .env.example file with the temporary file
mv "$TEMP_FILE" "$ENV_FILE"

# Cleanup the temporary file
rm -f "$TEMP_FILE"

echo "Environment variables have been updated in $ENV_FILE"