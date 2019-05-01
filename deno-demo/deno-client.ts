async function main() {
  // TCPコネクション設定 8000ポートで接続
  const conn = await Deno.dial('tcp', 'localhost:8000');
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  await conn.write(encoder.encode('Hello World!!!'));
  const buffer = new Uint8Array(1024);
  const {eof, nread} = await conn.read(buffer);

  const reply = decoder.decode(buffer.slice(0, nread));
  console.log(reply);
}

main();
