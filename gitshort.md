# Git Shortcuts

Being a lazy developer, I hate writing git commands repeatedly. Hence, I made a few abbreviated commands back in ~2015 and continue using them even today. 

This will be a living list of my git shortcuts, and I shall keep updating it as and when necessary to allow more functionality and commands.

```bash
function gp() {
    git add . && git commit -m "$1" && git push
}

function gc() {
    git checkout "$1"
}

function gcb(){
    git checkout -b "$1"
}

function gpl() {
    git pull
}

function grv() {
    git remote --v
}

function git-set-profile() {
    declare -A profiles

    # Define profiles here
    profiles[one]="one|one@gmail.com"
    profiles[two]="two|two@gmail.com"

    if [ -z "$1" ]; then
        echo "Usage: git-set-profile <profile>"
        echo "Available profiles:"
        for profile in "${!profiles[@]}"; do
            echo "  - $profile"
        done
        return 1
    fi

    local profile_key="$1"

    if [[ -n "${profiles[$profile_key]}" ]]; then
        local profile="${profiles[$profile_key]}"
        local username="${profile%%|*}"
        local email="${profile##*|}"

        git config user.name "$username"
        git config user.email "$email"

        echo "Git profile set to '$profile_key':"
        echo "  Username: $(git config user.name)"
        echo "  Email: $(git config user.email)"
    else
        echo "Profile '$profile_key' not found. Available profiles:"
        for profile in "${!profiles[@]}"; do
            echo "  - $profile"
        done
        return 1
    fi
}

```

And then some non-Git but important shortcuts for my development stack: 

```bash
alias runserver='python manage.py runserver'
alias migrate='python manage.py migrate'
alias makemigrate='python manage.py makemigrations'
```

Go ahead, copy away!