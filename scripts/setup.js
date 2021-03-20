// Menu: Setup!
// Description: Setup my machine.
// Author: Jhey Tompkins
// Twitter: @jh3yy

const $HOME = exec('echo $HOME', { silent: true }).trim()
const INSTALL_SCRIPT =
  'https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh'
await exec('chsh -s $(which zsh)')
await exec(`sh -c "$(curl -fsSL ${INSTALL_SCRIPT})"`)


const CONFIG = await readFile(`${$HOME}/.kenv/scripts/kody/config.json`, 'utf-8')
const { extensions, npm } = JSON.parse(CONFIG)
// Set up VsCode
const CODE_INSTALLED = await which('code')
if (CODE_INSTALLED) {
    if (extensions && extensions.length) {
        for (const EXT of extensions) {
            await exec(`code --install-extension ${EXT}`)
        }
    }
}
// Install NPM modules
const NPM_INSTALLED = await which('npm')
if (NPM_INSTALLED) {
    if (npm && npm.length) {
        for (const MOD of npm) {
            await exec(`npm i -g ${MOD}`)
        }
    }
}