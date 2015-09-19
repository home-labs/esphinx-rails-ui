Dir["./", "*/"].each{ |p| $:.unshift File.absolute_path(p) unless $:.include?(File.absolute_path(p)) }

require "do/ui/rails/version"

Gem::Specification.new do |s|
  s.name        = "do-ui-rails"
  s.version     = Do::Ui::Rails::VERSION
  s.authors     = ["home-labs"]
  s.email       = ["home-labs@outlook.com"]
  s.homepage    = "https://rubygems.org/gems/do-ui-rails"
  s.summary     = "Summary of Do UI."
  s.description = "Description of Do UI."
  s.license     = "MIT"

  s.files         = `git ls-files -z`.split("\x0")
  s.executables   = s.files.grep(%r{^bin/}) { |f| File.basename(f) }
  s.require_paths = ["lib"]

  # ~> entre a atual informada e uma nova versão na casa imediatamente a esquerda.
  # Ex. ~> 0.1.1 é o mesmo que < 0.2.0, >= 0.1.1. Isso validará 0.1.1, 0.1.1.0, 0.1.1.1, 0.1.2,....
  # >= igual ou superior a dada versão

  # cobrado no momento da execução do bundle
  s.add_runtime_dependency 'do-rails', '>= 0.0.9'
  s.add_runtime_dependency 'basicss-rails', '>= 0.0.7'

end
