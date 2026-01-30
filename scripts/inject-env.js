const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const templatePath = path.join(root, 'src/environments/environment.production.ts');
const targets = [{ path: path.join(root, 'src/environments/environment.ts'), production: true }];

const requiredVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];

const loadEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const contents = fs.readFileSync(filePath, 'utf8');
  const result = {};

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const equalsIndex = trimmed.indexOf('=');
    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
};

const fileEnv = {
  ...loadEnvFile(path.join(root, '.env.local')),
  ...loadEnvFile(path.join(root, '.env')),
};
const env = { ...fileEnv, ...process.env };

const missing = requiredVars.filter((key) => !env[key]);
const isStrict = Boolean(process.env.CI || process.env.VERCEL);

if (missing.length && isStrict) {
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
} else if (missing.length) {
  console.warn(`Missing env vars: ${missing.join(', ')}. Keeping placeholders.`);
}

const escapeValue = (value) =>
  value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n');

const supabaseUrl = env.SUPABASE_URL ? escapeValue(env.SUPABASE_URL) : '__SUPABASE_URL__';
const supabaseAnonKey = env.SUPABASE_ANON_KEY
  ? escapeValue(env.SUPABASE_ANON_KEY)
  : '__SUPABASE_ANON_KEY__';

const template = fs.readFileSync(templatePath, 'utf8');

const renderTemplate = (productionValue) => {
  let output = template.replace(/production:\s*(true|false)/, `production: ${productionValue}`);
  output = output.replace(/__SUPABASE_URL__|YOUR_SUPABASE_URL/g, supabaseUrl);
  output = output.replace(/__SUPABASE_ANON_KEY__|YOUR_SUPABASE_ANON_KEY/g, supabaseAnonKey);
  return output;
};

for (const target of targets) {
  const rendered = renderTemplate(target.production);
  fs.writeFileSync(target.path, rendered);
}
