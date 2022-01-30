<template>
    <div>
        <div class="header">
            <h3>Bot Generator (Web Version)</h3>
        </div>
        <div class="body">
            <form>
                <label>Name for bot: </label>
                <input
                    type="text"
                    placeholder="Name: "
                    class="textFeild"
                 />
                 <br />
                 <!-- Build Env -->
                <label>Type of bot: </label>
                <select class="drpt">
                    <option value="Discord">Discord</option>
                    <option value="Slack">Slack</option>
                </select>
                <br />
                <label>What is your bot's token?</label>
                 <input 
                    type="text"
                    placeholder="Token: "   
                    class="textFeild"
                />
                <br />
                <label>What is your clientId?</label>
                <input 
                    type="text"
                    placeholder="ClientId"
                    class="textFeild"
                />
                <br />
                <label>What is your guildId?</label>
                <input 
                    type="text"
                    placeholder="GuildId"
                    class="textFeild"
                />
                <br />
                <label>What is the Id of your admin role?</label>
                <input 
                    type="text"
                    placeholder="AdminRoleId"
                    class="textFeild"
                />
                <br />
                <label>What are you mainly using this bot for?</label>
                <div class="dropdown">
                    <div class="dropdown-content">
                        <p>Default</p>
                        <p></p>
                    </div>
                </div>
                <br />
                <label>Where would you like to put this on your system?</label>
                <input 
                    type="text"
                    placeholder="FilePath"
                    class="textFeild"
                />
                <br />
                <input
                    type="submit"
                    value="Generate Bot!"
                    class="submit-btn"
                />
                 <!-- TODO: Cool dropdown animation -->
                 <!-- Start running package -->
            </form>
        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script>
import '../lib/css/Pages/EcobotGeneratorPage.scss';
</script>
