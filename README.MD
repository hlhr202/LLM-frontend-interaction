# Example of LLM interacting with frontend script

## Install (server)
- prepare .env file under server folder
- in your .env file, put your openai api key as OPENAI_API_KEY="xxxx"
- start LLM interaction server
    ```bash
    cd server
    chmod +x run.sh
    ./run.sh
    ```

## Install (client)
- install through pnpm
    ```bash
    cd client
    pnpm install
    ```
- start web page
    ```bash
    pnpm run dev
    ```

## Usage
in your web page, write "go to user page" and then send it to server, it will redirect you to the user page!