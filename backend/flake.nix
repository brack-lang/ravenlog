{
  description = "The backend of the blog generator with the Brack markup language";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-24.11";
    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    flake-utils.url = "github:numtide/flake-utils";
    crate2nix.url = "github:nix-community/crate2nix";
  };

  outputs =
    {
      self,
      nixpkgs,
      rust-overlay,
      flake-utils,
      crate2nix,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ (import rust-overlay) ];
        };
        toolchain = pkgs.rust-bin.stable.latest.default;
        buildRustCrateForPkgs = crate: pkgs.buildRustCrate.override {
          rustc = pkgs.rust-bin.stable.latest.default;
          cargo = pkgs.rust-bin.stable.latest.default;
        };
        generatedCargoNix = crate2nix.tools.${system}.generatedCargoNix {
          name = "backend";
          src = ./.;
        };
        cargoNix = import generatedCargoNix {
          inherit pkgs buildRustCrateForPkgs;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs =
            with pkgs;
            [
              nil
              alejandra
              openssl
              openssl.dev
              pkg-config
              toolchain
              rust-analyzer
            ];
        };

        checks = {
          tests = cargoNix.rootCrate.build.override {
            runTests = true;
          };
        };

        packages = {
          default = cargoNix.rootCrate.build;
        };

        app.default = {
          type = "app";
          program = "${self.packages.default}/bin/rl";
        };
      }
    );
}
