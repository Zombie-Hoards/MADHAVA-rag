#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting MADHAVA development environment...${NC}"

# Check if ports are already in use
if lsof -i :3000 > /dev/null || lsof -i :5001 > /dev/null; then
  echo -e "${RED}Error: Ports 3000 or 5001 are already in use.${NC}"
  echo -e "${RED}Please close any applications using these ports and try again.${NC}"
  exit 1
fi

# Start backend server
echo -e "${GREEN}Starting backend server on port 5001...${NC}"
cd backend && npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Start frontend server
echo -e "${GREEN}Starting frontend server on port 3000...${NC}"
cd client && npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
cleanup() {
  echo -e "\n${BLUE}Shutting down servers...${NC}"
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  exit 0
}

# Register the cleanup function for when script receives SIGINT (Ctrl+C)
trap cleanup SIGINT

echo -e "${GREEN}Both servers are running!${NC}"
echo -e "${GREEN}Frontend: http://localhost:3000${NC}"
echo -e "${GREEN}Backend: http://localhost:5001${NC}"
echo -e "${BLUE}Press Ctrl+C to stop both servers${NC}"

# Keep the script running
wait
