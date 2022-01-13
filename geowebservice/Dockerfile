FROM debian:stretch
MAINTAINER Matt Bentley <mbentley@mbentley.net>

RUN apt update && \
    DEBIAN_FRONTEND=noninteractive apt install -y build-essential python python-dev python-setuptools nginx sqlite3 supervisor python-pip

ADD requirements.txt /opt/django/app/requirements.txt
RUN pip install -r /opt/django/app/requirements.txt && pip install uwsgi
ADD . /opt/django/

RUN (echo "daemon off;" >> /etc/nginx/nginx.conf &&\
  rm /etc/nginx/sites-enabled/default &&\
  ln -s /opt/django/django.conf /etc/nginx/sites-enabled/ &&\
  ln -s /opt/django/supervisord.conf /etc/supervisor/conf.d/)

RUN chmod +x /opt/django/run.sh 
VOLUME ["/opt/django/app"]
EXPOSE 80
CMD ["/opt/django/run.sh"]
