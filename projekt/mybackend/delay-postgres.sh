#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

>&2 echo "Waiting"

sleep 10

>&2 echo "Running mybackend"
exec $cmd