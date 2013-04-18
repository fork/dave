# encoding: UTF-8

module Dav
  class Engine < ::Rails::Engine
    isolate_namespace Dav
    middleware.use Dav::ResourceInstantiator

    # initializer "dav.xml.builder.nokogiri" do |app|
    #   ActionView::Template.register_template_handler :dav, Dav::Builder.new
    #   Mime::Type.register 'text/xml', :dav, %w[ text/xml application/x-xml ]
    # end

    initializer "dav.constants" do |app|
      Dav::INFINITY = 1.0 / 0 unless defined? Infinity
      Dav::ALL_PROPERTIES = <<-XML
<?xml version="1.0" encoding="utf-8" ?>
<D:propfind xmlns:D="DAV:"><D:allprop/></D:propfind>
      XML
    end
    initializer "dav.config.defaults" do |app|
      Dav.directory ||= Rails.public_path
    end
    initializer "dav.root.setup" do |app|
      Dav.root_path = File.expand_path Dav.directory, Rails.root

      puts 'Ξ' * 80
      puts "Locating Dav::Root at #{ Dav.root_path }."
      puts 'Ξ' * 80

      Dav::Root.setup
    end

  end
end
