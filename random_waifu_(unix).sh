#!/bin/sh
head -n1 waifus.csv
sed 1d waifus.csv | sort -R | head -n1

