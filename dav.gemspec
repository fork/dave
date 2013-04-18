# encoding: UTF-8

$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "dav/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "dav"
  s.version     = Dav::VERSION
  s.authors     = ["Florian Aßmann"]
  s.email       = ["florian.assmann@email.de"]
  s.homepage    = "http://webdav-engine.fork.de"
  s.summary     = "WebDAV as a Rails Engine."
  s.description = "WebDAV as a Rails Engine."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.2.13"
  s.add_dependency "nokogiri", "~> 1.5.9"

  s.add_development_dependency "sqlite3"
end
