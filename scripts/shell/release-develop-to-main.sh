#!/usr/bin/env bash

############################## CONSTANTS ##############################

# constants - git
MAIN_BRANCH_NAME='main'
DEVELOP_BRANCH_NAME='develop'
BASE_GITHUB_API_URL='https://api.github.com/repos/tinvesta/tinvesta-app'
GITHUB_PULL_REQUESTS_URL='https://github.com/tinvesta/tinvesta-app/pulls'

# constants - other
RELEASE_BRANCH_PREFIX='release-'
FILE_WITH_ENVIRONMENT_VARIABLES='.env'
GITHUB_ACCESS_TOKEN_ENVIRONMENT_NAME='GITHUB_ACCESS_TOKEN'

############################## FUNCTIONS ##############################

readEnvironmentVariable() {
  VAR=$(grep $1 $2 | xargs)
  IFS="=" read -ra VAR <<<"$VAR"
  echo ${VAR[1]}
}

getCurrentBranch() {
  echo $(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
}

printYesNoDecision() {
  while true; do
    read -p "$1" yn
    case $yn in
    [Yy]*) break ;;
    [Nn]*) exit ;;
    *) break ;;
    esac
  done
}

readVersionFromPackageJson() {
  echo $(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",\t ]//g')
}

############################## INITIALIZATION ##############################

# read environment variables
GITHUB_ACCESS_TOKEN=$(readEnvironmentVariable $GITHUB_ACCESS_TOKEN_ENVIRONMENT_NAME $FILE_WITH_ENVIRONMENT_VARIABLES)

GITHUB_API_AUTHORIZATION_TOKEN_HEADER='Authorization: token '"$GITHUB_ACCESS_TOKEN"''

############################## BASE CHECKS BEFORE SCRIPT INVOKE ##############################

# clear console
clear

# check if user is on the develop branch
currentBranch=$(getCurrentBranch)

if [ $currentBranch != $DEVELOP_BRANCH_NAME ]; then
  echo "Please make sure you are on '$DEVELOP_BRANCH_NAME' branch and come back!"

  exit 2
fi

# check if the user have unsaved changes
changedFiles=$(git status --porcelain)

if [ -n "$changedFiles" ]; then
  printYesNoDecision "You have unsaved changes. Continuing will remove all changes. Proceed? (Y/n)"
fi

# check if github access token is defined
if [ -z "$GITHUB_ACCESS_TOKEN" ]; then
  echo "You have to define '$GITHUB_ACCESS_TOKEN_ENVIRONMENT_NAME' environment variable in the '$FILE_WITH_ENVIRONMENT_VARIABLES' file."

  exit 5
fi

# check if github access token is legit
curl -f -H "$GITHUB_API_AUTHORIZATION_TOKEN_HEADER" "$BASE_GITHUB_API_URL/actions/workflows"

if [ $? != '0' ]; then
  echo "Your github API token '$GITHUB_ACCESS_TOKEN' defined in the '$FILE_WITH_ENVIRONMENT_VARIABLES' file is incorrect."

  exit $2
fi

############################## SCRIPT STARTS RIGHT HERE ##############################

# remove untracked files and directories
git clean -f
git clean -fd
git reset --hard
git fetch --all
clear

# update develop branch
git fetch origin
git reset --hard origin/$DEVELOP_BRANCH_NAME
git pull origin $DEVELOP_BRANCH_NAME
clear

# checkout and update main branch
git checkout $MAIN_BRANCH_NAME
git fetch origin
git reset --hard origin/$MAIN_BRANCH_NAME
git pull origin $MAIN_BRANCH_NAME
clear

# update develop branch
git checkout $DEVELOP_BRANCH_NAME
clear

# get information about release type
PS3='What type of release do you wanna do? '
options=("patch (0.0.x)" "minor (0.x.0)" "major (x.0.0)")
select opt in "${options[@]}"; do
  case $opt in
  "patch (0.0.x)")
    releaseType='patch'
    break
    ;;
  "minor (0.x.0)")
    releaseType='minor'
    break
    ;;
  "major (x.0.0)")
    releaseType='major'
    break
    ;;
  *) echo "invalid option $REPLY" ;;
  esac
done

# run release command to generate changelog and new tag
previousVersion=$(readVersionFromPackageJson)
yarn release:$releaseType
currentVersion=$(readVersionFromPackageJson)
clear

# create branch for release
releaseBranchName="$RELEASE_BRANCH_PREFIX$currentVersion"
git checkout -b $releaseBranchName $DEVELOP_BRANCH_NAME
git pull origin $DEVELOP_BRANCH_NAME
git push --follow-tags origin $releaseBranchName
clear

# merge main branch into release branch
git merge --strategy-option ours --no-edit --no-ff $MAIN_BRANCH_NAME
clear

# add all changes and push to release branch
git add -A
git commit -m "chore: merge"
git push --follow-tags origin $releaseBranchName
clear

# create pull request
curl -XPOST -g -H "$GITHUB_API_AUTHORIZATION_TOKEN_HEADER" -d '{ "title": "Release('$MAIN_BRANCH_NAME') '$currentVersion'", "head": "'$releaseBranchName'", "base": "'$MAIN_BRANCH_NAME'" }' "$BASE_GITHUB_API_URL/pulls"
curl -XPOST -g -H "$GITHUB_API_AUTHORIZATION_TOKEN_HEADER" -d '{ "title": "Release('$DEVELOP_BRANCH_NAME') '$currentVersion'", "head": "'$releaseBranchName'", "base": "'$DEVELOP_BRANCH_NAME'" }' "$BASE_GITHUB_API_URL/pulls"
clear

# open github page with pull requests
open $GITHUB_PULL_REQUESTS_URL

# cleanup
git checkout $DEVELOP_BRANCH_NAME
git branch -D $releaseBranchName

# git-reset-local-changes
yarn grlc
