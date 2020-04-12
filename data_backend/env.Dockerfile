FROM trestletech/plumber

ADD sources.list /etc/apt/sources.list

RUN rm -rf /etc/apt/sources.list.d/

RUN echo "MAKEFLAGS = -j" > ~/.R/Makevars

RUN apt-get update && apt-get install -y libxml2-dev libssl-dev

RUN R -e "install.packages(c('tidyverse', 'data.table', 'bit64'), repos='https://cloud.r-project.org/')"

