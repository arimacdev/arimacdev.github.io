spend = "https://api.imigames.io/api/v1/lg/wallet/spend/";
save = "https://api.imigames.io/api/v1/lg/game-records/";
highscore = "https://api.imigames.io/api/v1/lg/game-records/leaderboard?uuid=";

gameID = "84bbb4a2-cfb0-4645-9f11-d7d9b83db7c4";
leaderboardID = "25e88691-df58-4212-a01d-406e1907bc4a";

authtoken = "";
sessiontoken = "";
submitscore = 0;
runs = 0;
displayscore = 0;
highscore = 0;
lockkey = 4568907;

url = "";

class API {
	
    static savetoken(callback)
    { 
        url = new URL(window.location.href);
        authtoken = "Bearer " + url.searchParams.get("user");
        //authtoken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTYWhhbiBSYW5kdWxhIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTUzNzUyODkxNywiZXhwIjoxNTY5MDY0OTE3LCJ1ZCI6IjVjYWJhNzhkLTRhNjUtNDM1MS04ZDUyLTE3OTIyYzNjMTU4NyIsInR5cGUiOiJBQ0NFU1MifQ.dm_IDV7jpnzz7wrf1bFNstpuXS-l3yf7DJaAf7TDsXY';
        //API.gethighscore(callback);
        API.gethighscore(function (k) {
            callback(k);
        });
    }
	

    //static getbalance() {
    //    url = wallet;
    //    var request = new XMLHttpRequest();

    //    request.open('GET', url, true);
    //    request.setRequestHeader('Authorization', authtoken);
    //    request.send();
    //    request.onreadystatechange = processRequest;
    //    function processRequest(e) {
    //        if (request.readyState == 4 && request.status == 200) {
    //            var response = JSON.parse(request.responseText);
    //            coins = response.data;
    //            API.getcoinamount();
    //            console.log(response.data);
    //            //console.log(gameID);
    //        }
    //    }
    //}

    //static getcoinamount() {
    //    url = getburn + "" + gameID;
    //    var request = new XMLHttpRequest();

    //    request.open('GET', url, true);
    //    request.setRequestHeader('Authorization', authtoken);
    //    request.send();
    //    request.onreadystatechange = processRequest;
    //    function processRequest(e) {
    //        if (request.readyState == 4 && request.status == 200) {
    //            var response = JSON.parse(request.responseText);
    //            //console.log(response.data);
    //            playcoinvalue = response.data;
    //            if (coins < playcoinvalue) {
    //                console.log("Bad Balance");
    //            }
    //            else {
    //                console.log("Show the play button");
    //            }

    //        }
    //    }
    //}

    static spendcoins(callback) {

        url = spend + "" + gameID;
        var request = new XMLHttpRequest();

        request.open('POST', url, true);
        request.setRequestHeader('Authorization', authtoken);
        request.send();
        request.onreadystatechange = processRequest;
        function processRequest(e) {
            if (request.readyState == 4)
            {
                if (request.status == 200)
                {
                    var response = JSON.parse(request.responseText);
                    sessiontoken = response.data;
					console.log("spend success");
                    callback();
                }
                else
                {
                    console.log("something went wrong");
                }
            }
            
        }
    }

    static setscore(score)
    {
        submitscore = score ^ lockkey;
    }

    static appendscore(addon) {
        
        submitscore = submitscore ^ lockkey;
        submitscore = submitscore + addon;
        submitscore = submitscore ^ lockkey;
    }

    static getscore()
    {
        return submitscore ^ lockkey;
    }

	static setruns(runCount)
    {
        runs = runCount ^ lockkey;
    }

    static appendruns(addon) {
        
        runs = runs ^ lockkey;
        runs = runs + addon;
        runs = runs ^ lockkey;
    }

    static getruns()
    {
        return runs ^ lockkey;
    }
	
    static submitscore(callback)
    {
        var num1 = ((((submitscore ^ lockkey) * 679) - 674) * 739) ^ 217645177;
        var num2 = ((((submitscore ^ lockkey) + 255) * 699) + 258) ^ 393342743;
        var num3 = (((submitscore ^ lockkey) * 1499) + 2819) ^ 797003437;

        url = save + "" + num1 + "/" + num2 + "/" + num3;
        var request = new XMLHttpRequest();

        request.open('POST', url, true);
        request.setRequestHeader('Authorization', authtoken);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send("{\"score\" : \"" + (submitscore ^ lockkey)+"\",\"leaderboardUUID\" : \"" + leaderboardID + "\",\"gameUUID\" : \"" + gameID + "\",\"token\" : \"" + sessiontoken + "\"}");
        request.onreadystatechange = processRequest;
        function processRequest(e)
        {
            if (request.readyState == 4) {
                callback();
            }
        }

    }

    static gethighscore(callback)
    {
        url = "https://api.imigames.io/api/v1/lg/game-records/leaderboard?uuid=" + leaderboardID;
        var request = new XMLHttpRequest();

        request.open('GET', url, true);
        request.setRequestHeader('Authorization', authtoken);
        request.send();
        request.onreadystatechange = processRequest;
        function processRequest(e) {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    //console.log(response.data);
                    callback(response.data);
                }
                else
                {
                    console.log("Eroor");
                }
            }
        }

    }

}
