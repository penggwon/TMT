import {build} from 'esbuild';
import {mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
await mkdir('.sites-runtime',{recursive:true});
await build({entryPoints:['tests/engine.test.ts'],bundle:true,platform:'node',format:'esm',outfile:'.sites-runtime/engine-test.mjs'});
const run=spawnSync(process.execPath,['.sites-runtime/engine-test.mjs'],{stdio:'inherit'});
process.exit(run.status??1);
