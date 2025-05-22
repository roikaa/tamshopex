{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = [
    pkgs.prisma-engines # orm
    pkgs.prisma         # orm
    pkgs.mermaid-cli    # tool to output mermaid files to pdf,png,svg
    pkgs.nmh
    pkgs.tree           # tool to print tree
    pkgs.zsh            # Shell
    pkgs.tikzit         # Graphical tool for rapidly creating graphs and diagrams using PGF/TikZ
    pkgs.texliveFull    # latex
    pkgs.texlive.combined.scheme-full
    pkgs.cope
    pkgs.python311Packages.pip

  ];

  shellHook = ''
    export PKG_CONFIG_PATH="${pkgs.openssl.dev}/lib/pkgconfig"
    export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
    export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
    export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
    export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
  '';
}

