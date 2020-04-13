import pymongo
import click

def fatal(msg):
    print('[ERROR] ' + msg)
    exit(-1)

@click.group()
def cli():
    pass

@click.command()
def init():
    client = pymongo.MongoClient("mongodb://root:tCaJXhP77xdKR4Y7@mongo.pkuzhiyuan.com:27017/nx_zhiyuan")
    dbs = client.list_database_names()
    print(dbs)
    if "nx_zhiyuan" in dbs:
        fatal("The database `nx_zhiyuan` already exists.")

cli.add_command(init)

if __name__ == '__main__':
    cli()