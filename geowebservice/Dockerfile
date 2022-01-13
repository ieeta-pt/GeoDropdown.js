FROM python:3.10

COPY requirements.txt /
RUN pip install -r /requirements.txt
COPY . /app/

WORKDIR /app

EXPOSE 8000
ENTRYPOINT ["gunicorn", "-b 0.0.0.0:8000", "geowebservice.wsgi"]
