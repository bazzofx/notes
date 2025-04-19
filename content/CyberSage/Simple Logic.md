
## Red Team
Red Team Initial Access attempt phase, if it perform a phishing attack on a device without protection progress to next phase


## Blue Team

### Added
- If Red Team attack device without protection no alert should be generated but instead the turn is just passed to Blue Team
- Blue Team must select the correct device generating alert in order to mitigate the attack correctly If Blue Team select the wrong device to investigate, Red Team alert progress to next phase.

#### Patch Vulnerability Logic
- Lets add a status to each device, status "Health" starts at 100 and decrease slowly over time, when we click Patch Vulnerability the server health becomes 100 again 
- If an attacker attempts to attack a server that is low health under 50, it has a 25% chance of bypassing the Blue Team turn and and move to the next step of the kill chain attack phase, if the server health is less than 25% it has 50% chance of going to the next phase skipping the possibility for the Blue Team to defend it.
- Write message "Critical $deviceName Low Health - Vulnerable please Patch it!


### Not added yet
- If Red Team attack device without protection no alert should be generated but instead the turn is just passed to Blue Team

- Patching Vulnerability does not go back an attack step on kill chain


# Blue Team AI Logic
**AI Opponent Logic**: Updated the AI opponent to use the same response validation system:

- Blue Team AI has a 70% chance to select a correct response
- Red Team AI generates attacks based on the current kill chain stage