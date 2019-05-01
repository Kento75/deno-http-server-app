#!/usr/bin/env deno --allow-net
import {BufReader, BufWriter} from 'https://deno.land/std@v0.3.2/io/bufio.ts';

async function readLine(bufReader: BufReader): Promise<string> {
  const [line, ok, err] = await bufReader.readLine();

  // golangみたいなやり方?
  if (!ok && err) {
    throw err;
  }

  return new TextDecoder().decode(line);
}

async function http_echo_server() {
  const listener = Deno.listen('tcp', 'localhost:8000');
  const conn = await listener.accept();
  const bufReader = new BufReader(conn);
  const bufWriter = new BufWriter(conn);
  const encoder = new TextEncoder();

  const requestLine = await readLine(bufReader);
  const [_, method, pathname, version] = requestLine.match(
    /^([^ ]+)? ([^ ]+?) ([^ ]+?)$/
  );
  // 4-3
  let headerLine: string;
  const requestHeaders = new Headers();
  while ((headerLine = await readLine(bufReader)).length > 0) {
    const [key, value] = headerLine.split(':').map(s => s.trim());

    requestHeaders.set(key, value);
  }

  // Request Body を数値に変換して、バッファサイズを取得
  const contentLength = parseInt(requestHeaders.get('content-length'));
  // 必要なバッファサイズを確保
  const bodyBuf = new Uint8Array(contentLength);
  await bufReader.readFull(bodyBuf);

  // Nodeのようにstatus()などはない
  // バッファに書き込み必要がある
  await bufWriter.write(encoder.encode('HTTP/1.1 200 OK\r\n'));

  // ループ処理で、全ての値をバファに書き込む
  for (const [key, value] of requestHeaders.entries()) {
    await bufWriter.write(encoder.encode('${key}: ${value}\r\n'));
  }
  await bufWriter.write(encoder.encode('\r\n'));

  await bufWriter.write(bodyBuf);
  await bufWriter.flush();
  conn.close();
}

http_echo_server();
console.log('Echo Server: localhost: 8000');
