grafana
docker pull grafana/grafana
docker volume create --driver local --name grafana
docker run -d -p 3000:3000 --name=grafana -v grafana:/var/lib/grafana grafana/grafana

prometheus
docker pull prom/prometheus
docker volume create --driver local --name prometheus
docker run -d --name prometheus -p 9090:9090 -v /home/user/Desktop/monitor/prometheus.yml:/etc/prometheus/prometheus.yml -v prometheus:/data/ prom/prometheus




redis-exporter
docker pull oliver006/redis_exporter
docker run -d --name redis_exporter -p 9121:9121 -e REDIS_ADDR=redis://192.168.43.21:6379 -e REDIS_PASSWORD=foobared oliver006/redis_exporter


https://hub.docker.com/r/oliver006/redis_exporter
https://grafana.com/grafana/dashboards/763
https://github.com/oliver006/redis_exporter
https://prometheus.io/docs/instrumenting/exporters/



altermanager
docker pull prom/alertmanager
wget -O alertmanager.yml https://raw.githubusercontent.com/prometheus/alertmanager/master/doc/examples/simple.yml
docker run -d --name alertmanager -p 9093:9093 -v /home/user/Desktop/monitor/alertmanager.yml:/etc/alertmanager/alertmanager.yml prom/alertmanager




https://prometheus.io/download/
https://github.com/prometheus/alertmanager
https://quay.io/repository/prometheus/alertmanager
https://hub.docker.com/r/prom/alertmanager




