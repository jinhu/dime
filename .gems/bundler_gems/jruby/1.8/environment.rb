# DO NOT MODIFY THIS FILE
module Bundler
 file = File.expand_path(__FILE__)
 dir = File.dirname(file)

  ENV["GEM_HOME"] = dir
  ENV["GEM_PATH"] = dir

  # handle 1.9 where system gems are always on the load path
  if defined?(::Gem)
    $LOAD_PATH.reject! do |p|
      p != File.dirname(__FILE__) &&
        Gem.path.any? { |gp| p.include?(gp) }
    end
  end

  ENV["PATH"]     = "#{dir}/../../../../bin:#{ENV["PATH"]}"
  ENV["RUBYOPT"]  = "-r#{file} #{ENV["RUBYOPT"]}"

  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/jruby-jars-1.6.1/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/bundler-1.0.12/bin")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/bundler-1.0.12/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/tzinfo-0.3.26/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/arel-2.0.9/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/polyglot-0.3.1/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/treetop-1.4.9/bin")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/treetop-1.4.9/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/mime-types-1.16/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/abstract-1.0.0/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/rake-0.8.7/bin")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/rake-0.8.7/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/thor-0.14.6/bin")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/thor-0.14.6/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/rack-1.2.2/bin")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/rack-1.2.2/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/erubis-2.6.6/bin")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/erubis-2.6.6/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/rack-mount-0.6.14/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/rack-test-0.5.7/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/builder-2.1.2/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/appengine-apis-0.0.22/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/activesupport-3.0.6/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/i18n-0.5.0/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/mail-2.2.15/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/activemodel-3.0.6/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/activeresource-3.0.6/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/activerecord-3.0.6/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/actionpack-3.0.6/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/railties-3.0.6/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/actionmailer-3.0.6/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/jruby-rack-1.0.5/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/appengine-rack-0.0.12/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/activerecord-datastore-adapter-0.0.3/lib")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/rails-3.0.6/bin")
  $LOAD_PATH.unshift File.expand_path("#{dir}/gems/rails-3.0.6/lib")

  @gemfile = "#{dir}/../../../../Gemfile"


  def self.require_env(env = nil)
    context = Class.new do
      def initialize(env) @env = env && env.to_s ; end
      def method_missing(*) ; yield if block_given? ; end
      def only(*env)
        old, @only = @only, _combine_only(env.flatten)
        yield
        @only = old
      end
      def except(*env)
        old, @except = @except, _combine_except(env.flatten)
        yield
        @except = old
      end
      def gem(name, *args)
        opt = args.last.is_a?(Hash) ? args.pop : {}
        only = _combine_only(opt[:only] || opt["only"])
        except = _combine_except(opt[:except] || opt["except"])
        files = opt[:require_as] || opt["require_as"] || name
        files = [files] unless files.respond_to?(:each)

        return unless !only || only.any? {|e| e == @env }
        return if except && except.any? {|e| e == @env }

        if files = opt[:require_as] || opt["require_as"]
          files = Array(files)
          files.each { |f| require f }
        else
          begin
            require name
          rescue LoadError
            # Do nothing
          end
        end
        yield if block_given?
        true
      end
      private
      def _combine_only(only)
        return @only unless only
        only = [only].flatten.compact.uniq.map { |o| o.to_s }
        only &= @only if @only
        only
      end
      def _combine_except(except)
        return @except unless except
        except = [except].flatten.compact.uniq.map { |o| o.to_s }
        except |= @except if @except
        except
      end
    end
    context.new(env && env.to_s).instance_eval(File.read(@gemfile), @gemfile, 1)
  end
end

$" << "rubygems.rb"

module Kernel
  def gem(*)
    # Silently ignore calls to gem, since, in theory, everything
    # is activated correctly already.
  end
end

# Define all the Gem errors for gems that reference them.
module Gem
  def self.ruby ; "/Users/jin/.rvm/rubies/jruby-1.5.5/bin/jruby" ; end
  def self.dir ; @dir ||= File.dirname(File.expand_path(__FILE__)) ; end
  class << self ; alias default_dir dir; alias path dir ; end
  class LoadError < ::LoadError; end
  class Exception < RuntimeError; end
  class CommandLineError < Exception; end
  class DependencyError < Exception; end
  class DependencyRemovalException < Exception; end
  class GemNotInHomeException < Exception ; end
  class DocumentError < Exception; end
  class EndOfYAMLException < Exception; end
  class FilePermissionError < Exception; end
  class FormatException < Exception; end
  class GemNotFoundException < Exception; end
  class InstallError < Exception; end
  class InvalidSpecificationException < Exception; end
  class OperationNotSupportedError < Exception; end
  class RemoteError < Exception; end
  class RemoteInstallationCancelled < Exception; end
  class RemoteInstallationSkipped < Exception; end
  class RemoteSourceException < Exception; end
  class VerificationError < Exception; end
  class SystemExitException < SystemExit; end
end
