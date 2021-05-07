if [ "$#" -ne 1 ]; then
	echo "Usage: $0 dir" >&2
	echo "Example: $0 abu_amr/duri" >&2
	exit 1
fi
if mkdir -p out/$1; then
	for i in $(seq -f "%03g" 1 604); do
		if [ ! -e $1/text/$i ]; then
			echo -n "Fatal: "
			echo "$1 files missing"
			exit 1
		fi
	done
	node src/text.js $1
else
	echo "Couldn't create out directories"
fi

