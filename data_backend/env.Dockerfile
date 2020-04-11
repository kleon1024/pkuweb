FROM trestletech/plumber

RUN rm -rf /etc/apt/sources.list.d/

RUN apt-get update && apt-get install -y libxml2-dev libssl-dev

RUN R -e "install.packages(c('tidyverse', 'data.table'), repos='https://cloud.r-project.org/')"

