serve:
	make build && gulp connect
build:
	rm -rf ./catalan-language-understanding-benchmark && gulp all
