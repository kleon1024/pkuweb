FROM trestletech/plumber

LABEL maintainer "Keqiang Li<keqianglli@gmail.com>"

ADD sources.list /etc/apt/sources.list

RUN rm -rf /etc/apt/sources.list.d/

RUN apt-get update && apt-get install -y libxml2-dev libssl-dev

RUN R -e "install.packages(c('tidyverse', 'data.table'), repos='https://cran.rstudio.com/')"

ADD *.R /app/data_backend/src/

WORKDIR /app/data_backend/src

CMD ["api.R"]

# FROM rocker/r-base

# ADD sources.list /etc/apt/sources.list

# RUN rm -rf /etc/apt/sources.list.d/

# RUN apt-get update && apt-get install -y \
#   git-core \
#   libssl-dev \
#   libcurl4-gnutls-dev

# RUN install2.r plumber

# RUN R -e "install.packages(c('tidyverse', 'data.table'), repos='https://cran.rstudio.com/')"

# EXPOSE 8000

# WORKDIR /app/data_backend/src

# CMD ["api.R"]