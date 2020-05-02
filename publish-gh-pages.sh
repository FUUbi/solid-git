git checkout gh-pages
git checkout master -- ./examples/isomorphic-git

cd examples/isomorphic-git

npm i
npm run-script build
mv dist/* ../../
cd ../..
rm -r examples .idea LICENSE README.md

git add .
git commit -m "update github pages"
git push origin gh-pages

git checkout master

