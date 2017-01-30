Vagrant.configure("2") do |config|
    config.vm.box = "dummy"
    config.vm.provider :aws do |aws, override|
        aws.access_key_id = ENV["AWS_ACCESS_KEY"]
        aws.secret_access_key = ENV["AWS_ACCESS_KEY_SECRET"]
        aws.keypair_name = "ivkeypar"
        aws.security_groups = [ 'vagrant' ]
        aws.ami = "ami-7747d01e"
        override.ssh.username = "ubuntu"
        override.ssh.private_key_path = ENV["PATH_SSH_KEY"]
        config.vm.provision "ansible" do |ansible|
            ansible.sudo = true
            ansible.raw_arguments=["-vvv"]
            ansible.playbook = "ansible.yml"
            ansible.verbose= "v"
            ansible.host_key_checking=false
        end
    end
end
