#!/usr/bin/env zsh

# Sequential File Renamer
# Renames all files in a directory from 1 to n while keeping file extensions

# Function to display usage
usage() {
    echo "Usage: $0 [directory_path]"
    echo "If no directory is specified, current directory will be used"
    echo "Example: $0 /path/to/files"
    exit 1
}

# Function to rename files
rename_files() {
    local target_dir="$1"
    local counter=1
    
    # Check if directory exists
    if [[ ! -d "$target_dir" ]]; then
        echo "Error: Directory '$target_dir' does not exist"
        exit 1
    fi
    
    # Change to target directory
    cd "$target_dir" || exit 1
    
    echo "Renaming files in: $(pwd)"
    echo "----------------------------------------"
    
    # Create array of files (excluding directories and hidden files)
    files=()
    while IFS= read -r -d '' file; do
        files+=("$file")
    done < <(find . -maxdepth 1 -type f ! -name ".*" -print0 | sort -z)
    
    # Check if there are files to rename
    if [[ ${#files[@]} -eq 0 ]]; then
        echo "No files found to rename in the directory"
        exit 0
    fi
    
    echo "Found ${#files[@]} files to rename"
    echo "----------------------------------------"
    
    # Ask for confirmation
    echo -n "Do you want to proceed with renaming? (y/N): "
    read confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo "Operation cancelled"
        exit 0
    fi
    
    # Rename files
    for file in "${files[@]}"; do
        # Remove leading "./" from filename
        clean_file="${file#./}"
        
        # Get file extension
        if [[ "$clean_file" == *.* ]]; then
            extension=".${clean_file##*.}"
        else
            extension=""
        fi
        
        # New filename
        new_name="${counter}${extension}"
        
        # Check if target filename already exists and is different from source
        if [[ -e "$new_name" && "$clean_file" != "$new_name" ]]; then
            echo "Warning: '$new_name' already exists, skipping '$clean_file'"
            continue
        fi
        
        # Rename the file
        if [[ "$clean_file" != "$new_name" ]]; then
            mv "$clean_file" "$new_name"
            echo "Renamed: '$clean_file' -> '$new_name'"
        else
            echo "Skipped: '$clean_file' (already has correct name)"
        fi
        
        ((counter++))
    done
    
    echo "----------------------------------------"
    echo "Renaming completed!"
}

# Main script execution
main() {
    # Check for help flag
    if [[ "$1" == "-h" || "$1" == "--help" ]]; then
        usage
    fi
    
    # Determine target directory
    if [[ $# -eq 0 ]]; then
        target_directory="."
    elif [[ $# -eq 1 ]]; then
        target_directory="$1"
    else
        echo "Error: Too many arguments"
        usage
    fi
    
    # Call rename function
    rename_files "$target_directory"
}

# Run main function with all arguments
main "$@"
