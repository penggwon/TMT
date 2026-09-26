import vinext from 'vinext';
import {defineConfig} from 'vite';
export default defineConfig(async()=>{
 process.env.CLOUDFLARE_CF_FETCH_ENABLED ??= 'false';
 process.env.WRANGLER_SEND_METRICS ??= 'false';
 const {cloudflare}=await import('@cloudflare/vite-plugin');
 return {server:{watch:process.env.CODEX_SANDBOX==='seatbelt'?{usePolling:true}:undefined},plugins:[vinext(),cloudflare({configPath:'wrangler.jsonc',viteEnvironment:{name:'rsc',childEnvironments:['ssr']},inspectorPort:false})]};
});
