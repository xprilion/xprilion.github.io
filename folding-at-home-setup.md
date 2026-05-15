# Folding@Home Setup - Local and Cloud VM

---

The world is facing an unprecedented situation with the [Coronavirus outbreak](https://www.who.int/emergencies/diseases/novel-coronavirus-2019). It is crucial at these times for everyone to join hands and fight the rapidly spreading virus. Computing power available to researchers is very valuable right now. [Folding@Home](https://foldingathome.org/) is a project which allows crowd-sourcing computing power by the help of distributed computing over public compute nodes for the study of biological proteins. The project is currently providing (at the time of writing this article) more than 470 petaFlops of computing power to researchers for studying Coronavirus, and to eventually prepare a cure for it.

## But, What should I do?

> Contribute.

Your computer's idle time can be utilized towards contributing to the Folding@Home project very, very easily.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/04/image-5.png)
## What do I need?

All that you need for contributing to the Folding@Home project -
- A working computer, can be local, can be a VM
- A stable internet connection
- A will to help, even if for a few hours a day!

Do you have these? If yes (or even if no), read on!

## How to setup?

I shall provide a very quick but complete setup here that should get you started in no time.

The general procedure is as follows -
- [Create a passkey](https://apps.foldingathome.org/passkey/create) for yourself.
- Download and install the `FAHClient` setup on the machine which will perform computation. You'll need your passkey in this step.
- Download the install the `FAHControl` setup on the machine which you will use to control and monitor your `FAHClient`.
- Any additional configuration as needed.

Let's get started!

### Setup on a local machine

Setting up on a local machine is very simple. Follow along the steps below -

#### Windows
- [Download](https://download.foldingathome.org/releases/public/release/fah-installer/windows-10-32bit/v7.5/fah-installer_7.5.1_x86.exe) and run the installer.
- Click Yes, Next, I Agree, Next, Finish.
- Enter a name, `team number 250120` (to join our team, use 0 for no team), and Passkey.
- Click Save.

#### Linux
- Download the `FAHClient` package for your distro, using the following command:

```bash
# Debian/Ubuntu/Mint
wget https://download.foldingathome.org/releases/public/release/fahclient/debian-testing-64bit/v7.4/fahclient_7.4.4_amd64.deb

# RedHat / CentOS / Fedora
wget https://download.foldingathome.org/releases/public/release/fahclient/centos-5.3-64bit/v7.4/fahclient-7.4.4-1.x86_64.rpm

```
- Install package using following command:

```bash
# Debian/Ubuntu/Mint
sudo dpkg -i --force-depends fahclient_7.4.4_amd64.deb
sudo apt install -f

# RedHat / CentOS / Fedora
sudo rpm -i --nodeps fahclient-7.4.4-1.x86_64.rpm

```
- Enter a name, `team number 250120` (to join our team, use 0 for no team), and Passkey.
- Complete the `FAHClient` installation.
- Download `FAHControl` using the following command:

```bash
# Debian/Ubuntu/Mint
wget https://download.foldingathome.org/releases/public/release/fahcontrol/debian-testing-64bit/v7.4/fahcontrol_7.4.4-1_all.deb

# RedHat / CentOS / Fedora
wget https://download.foldingathome.org/releases/public/release/fahcontrol/centos-5.3-64bit/v7.4/fahcontrol-7.4.4-1.noarch.rpm

```
- Install FAHControl using the following command:

```bash
# Debian/Ubuntu/Mint
sudo dpkg -i --force-depends fahcontrol_7.4.4-1_all.deb
sudo apt install -f

# RedHat / CentOS / Fedora
sudo rpm -i --nodeps fahcontrol-7.4.4-1.noarch.rpm

```

### Setup on a VM

After provisioning your VM, assuming it is a Linux VM (we prefer Ubuntu 18.04 LTS), follow the given steps -

#### Steps to be performed on VM
- Update your package repository.

```bash
sudo apt update

```
- Download the `FAHClient` package for your distro, using the following command:

```bash
# Debian/Ubuntu/Mint
wget https://download.foldingathome.org/releases/public/release/fahclient/debian-testing-64bit/v7.4/fahclient_7.4.4_amd64.deb

```
- Install package using the following command:

```plaintext
# Debian/Ubuntu/Mint
sudo dpkg -i --force-depends fahclient_7.4.4_amd64.deb
sudo apt install -f

```
- Enter a name, `team number 250120` (to join our team, use 0 for no team), and Passkey.
- Complete the `FAHClient` installation.
- Stop the `FAHClient`

```bash
sudo /etc/init.d/FAHClient stop

```
- Edit the configuration file, as shown below:

```bash
sudo nano /etc/fahclient/config.xml

```

Your file should look like:

```text
<config>
  <!-- Client Control -->
  <fold-anon v='true'/>

  <!-- Folding Slot Configuration -->
  <gpu v='false'/>

  <!-- HTTP Server -->
  <allow v='127.0.0.1 your_local_system_ip'/>

  <!-- Slot Control -->
  <power v='full'/>

  <!-- User Information -->
  <passkey v='your_passkey'/>
  <team v='250120'/>
  <user v='your_name'/>

  <!-- Web Server -->
  <web-allow v='127.0.0.1 your_local_system_ip'/>

  <!-- Folding Slots -->
  <slot id='0' type='CPU'/>
</config>

```
- Restart the `FAHClient`

```bash
sudo /etc/init.d/FAHClient start

```

#### Steps to be performed locally
- Now, you'll need to install the `FAHControl` on your local system. Use the steps given in the Setup on local machine section to install `FAHControl` on your local system.
- You should be able to access your remote `FAHClient` using the following address:

```bash
http://your_vm_ip:7396

```

You should see the dashboard displaying information as shown in the following screenshot:
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/04/image-6.png)
You can always head over the [official installation documentation](https://foldingathome.org/support/faq/) for more details and options! You can also ask questions on the [Folding Forum](https://foldingforum.org/).