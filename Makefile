.PHONY: test html-coverage-report

test:
	@./node_modules/lab/bin/lab -m 20000 -v -t 100 test

html-coverage-report:
	@./node_modules/lab/bin/lab -r html test > coverage.html; open coverage.html
