# Sports Player Chain Game 🏈🏀⚾

A fun web game where players connect sports athletes by matching letters! The first letter of the next player's first name must match the first letter of the previous player's last name.

## How to Play

1. Enter any sports player name to start
2. For subsequent players, the first letter of their first name must match the first letter of the previous player's last name
3. Build the longest chain possible!

## Known Bugs

- Name suffixes are incorrectly captured as last names (e.g. John Smith Jr. -> last name initial = "J").
- Names can sometimes match imprecicely. For example, Will Smith will match Willie Smith (likely matches "W" of first name and "Smith" for last name)

## Example Chain
- **Trey Alexander** → **Anthony Black**

## API Integration

This game integrates with real sports APIs to get live player data:

### 🏀 Basketball (NBA)
- **API**: Balldontlie.io (Free)
- **Endpoint**: `https://www.balldontlie.io/api/v1/players`
- **Features**: Player search, team info, positions
- **No API key required**

### ⚾ Baseball (MLB)
- **API**: MLB Stats API (Free)
- **Endpoint**: `https://statsapi.mlb.com/api/v1/people`
- **Features**: Current players, team info, positions
- **No API key required**

### 🏈 Football (NFL) - Coming Soon
- **API**: SportsData.io (Requires API key)
- **Setup**: Get free API key at https://sportsdata.io/
- **Add your key to `config.js`**

## Features

- ✅ Real-time API integration
- ✅ Player caching for performance
- ✅ Clean, modern UI
- ✅ Real-time chain tracking
- ✅ Player information display
- ✅ Responsive design
- ✅ Input validation
- ✅ Chain history
- ✅ Fallback data when APIs are unavailable

### Current API Status
- **Basketball**: ✅ Working (Free)
- **Baseball**: ✅ Working (Free)
- **Football**: ⏳ Requires API key setup

## Testing the APIs

## Future Enhancements

- [ ] Add more sports (Soccer, Hockey, Tennis)
- [ ] Real player photos from image APIs
- [ ] User authentication and profiles
- [ ] Implement leaderboards
- [ ] Game statistics and achievements
- [ ] Multiplayer mode

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**: Balldontlie.io (NBA), MLB Stats API, SportsData.io (NFL)
- **Design**: Modern gradient design with responsive layout
- **Future Backend**: Node.js + Express (planned)

## Troubleshooting

### API Issues
- If you see "Player not found", try different variations of the name
- Check browser console for API error messages
- The game will fall back to local data if APIs fail

### CORS Issues
- Some APIs may have CORS restrictions
- The game includes fallback data to handle this
- Consider using a proxy server for production

## Contributing

Feel free to:
- Add more players to the fallback data
- Improve API error handling
- Add new sports APIs
- Enhance the UI/UX

---

**Note**: This version includes real API integration while maintaining fallback functionality for reliability.
