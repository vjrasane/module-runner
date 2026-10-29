{ pkgs, config, ... }:

{
  languages.typescript.enable = true;

  packages = with pkgs; [
    nodejs_26
    just
  ];

  tasks = {
    "npm:install" = {
      exec = "npm install";
      execIfModified = [
        "package.json"
        "package-lock.json"
      ];
      after = [ "devenv:enterShell" ];
    };
  };
}
