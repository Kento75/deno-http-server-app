async function main() {
  // TCPコネクション設定 8000ポートで接続
  const listener = Deno.listen('tcp', 'localhost:8000');

  // 接続要求がくるまで待つ
  const conn = await listener.accept();
  // バッファサイズ指定
  const buffer = new Uint8Array(1024);
  const {eof, nread} = await conn.read(buffer);

  await conn.write(buffer.slice(0, nread));

  conn.close();
}

main();
