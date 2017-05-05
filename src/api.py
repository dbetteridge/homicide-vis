from flask import Flask
import pandas as pd
from flask.ext.cors import CORS, cross_origin
import re

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
#data = pd.read_csv("../public/database.csv")
data = pd.read_csv("../public/useddata.csv")

#string = data.loc[:,["State","Relationship","Weapon"]]
#string.to_csv("../public/useddata.csv", ",")
string = data
string = string.to_json(orient='index')
string = re.sub(r'["]\d+["][:]','',string)
string = string.replace("{{", "[{").replace("}}", "}]")


@app.route('/database')
@cross_origin()
def index():    
    return string

if __name__ == '__main__':
    app.run(debug=True)