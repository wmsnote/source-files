```
sudo pip3 install autoenv
echo "source `which activate.sh`" >> ~/.zshrc
source .zshrc
# 项目工程文件夹中新建.env文件
touch .env
# 在env文件中写入 pipenv shell
cat << eof >> .env
heredoc> pipenv shell
heredoc> eof
```

这样就配置好了 autoenv 了，当 cd 到项目目录中后，就会自动激活虚拟环境了，如果是第一次，系统会提示你确认是否以后都自动激活，输入 y ，然后回车确认即可。






