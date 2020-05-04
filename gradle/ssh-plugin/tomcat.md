```bash
#!/bin/bash  

# description: Tomcat7 Start Stop Restart  

# processname: tomcat7  

# chkconfig: 234 20 80  

JAVA_HOME=/opt/jdk1.8.0_121

export JAVA_HOME  

PATH=$JAVA_HOME/bin:$PATH  

export PATH  

CATALINA_HOME=/opt/test/apache-tomcat-8.5.15

case $1 in  

start)  

sh $CATALINA_HOME/bin/startup.sh  

;;   

stop)     

sh $CATALINA_HOME/bin/shutdown.sh  

;;   

restart)  

sh $CATALINA_HOME/bin/shutdown.sh  

sh $CATALINA_HOME/bin/startup.sh  

;;   

esac      

exit 0
```