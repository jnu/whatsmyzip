#!/bin/bash

MVERSION=`cat manifest.json | grep --color=never version | grep --color=never -o '[0-9]\+\.[0-9]\+\.[0-9]\+'`
PVERSION=`cat package.json | grep --color=never version | grep --color=never -o '[0-9]\+\.[0-9]\+\.[0-9]\+'`

if [ "$MVERSION" != "$PVERSION" ]; then
    echo "Manifest and package are at different versions ($MVERSION vs. $PVERSION)."
    echo "Please fix this before publishing."
    exit 1
fi

if [[ -n $(git status -s) ]]; then
    echo "You have changes to commit. Please fix this before publishing."
    exit 2
fi


TAG="v$PVERSION"
git tag -a $TAG
git push origin $TAG

zip "./dist/whatsmyzip-$TAG.zip" icon.png manifest.json dist/*.js dist/*.html
