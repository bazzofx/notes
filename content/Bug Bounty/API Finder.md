cd ~/Documents/pubtools/filaris

cargo run -- --url "[https://ac.e.necsws.com/admin/](https://ac.e.necsws.com/admin/)" | tee filaris_result.txt

cat filaris_result.txt | grep ac.e.necsws | grep admin | sort | uniq | cut -d ">" -f 2| | sed 's/ //g'| tee 2filaris_results.txt

cat 2filaris_results.txt| pbfff -o roots

cd roots

gf secrets | tee ../secrets.txt

cd ..

mkdir reports_results

mv *.txt report_results