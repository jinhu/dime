# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{activerecord-datastore-adapter}
  s.version = "0.0.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Mohammed Siddick"]
  s.date = %q{2011-04-10}
  s.description = %q{Just an ActiveRecord Adapter for the Appengine Datastore. 
    Create Rails3 application: rails new app_name -m http://siddick.github.com/datastore/rails3.rb}
  s.email = ["siddick@gmail.com"]
  s.files = [".gitignore", "Gemfile", "Gemfile.lock", "MIT-LICENSE", "README.textile", "Rakefile", "activerecord-datastore-adapter.gemspec", "examples/rails3.rb", "examples/rails3_edge.rb", "lib/active_record/connection_adapters/datastore_adapter.rb", "lib/active_record/datastore_associations_patch.rb", "lib/arel/visitors/datastore.rb", "spec/create_table_spec.rb", "spec/datatypes_spec.rb", "spec/operators_spec.rb", "spec/query_spec.rb", "spec/relations_spec.rb", "spec/spec_helper.rb", "spec/table_schema.rb"]
  s.homepage = %q{http://rubygems.org/gems/datastore}
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{activerecord-datastore-adapter}
  s.rubygems_version = %q{1.3.6}
  s.summary = %q{ActiveRecord Adapter for Appengine Datastore}

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 3

    if Gem::Version.new(Gem::RubyGemsVersion) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<appengine-apis>, ["= 0.0.22"])
      s.add_runtime_dependency(%q<activerecord>, ["= 3.0.6"])
      s.add_runtime_dependency(%q<arel>, [">= 2.0.7"])
    else
      s.add_dependency(%q<appengine-apis>, ["= 0.0.22"])
      s.add_dependency(%q<activerecord>, ["= 3.0.6"])
      s.add_dependency(%q<arel>, [">= 2.0.7"])
    end
  else
    s.add_dependency(%q<appengine-apis>, ["= 0.0.22"])
    s.add_dependency(%q<activerecord>, ["= 3.0.6"])
    s.add_dependency(%q<arel>, [">= 2.0.7"])
  end
end
