module Dav

  module But

    class Verb
      attr_accessor :verb
      def initialize(verb)
        @verb = verb
      end
      def matches?(request)
        request.method == verb
      end
      alias_method :inspect, :verb
    end
    PROPFIND = Verb.new 'PROPFIND' unless defined? PROPFIND
    GET      = Verb.new 'GET'      unless defined? GET
    PUT      = Verb.new 'PUT'      unless defined? PUT
    DELETE   = Verb.new 'DELETE'   unless defined? DELETE
    MKCOL    = Verb.new 'MKCOL'    unless defined? MKCOL

    class Not
      attr_accessor :delegate
      def initialize(delegate)
        @delegate = delegate
      end
      def matches?(request)
        not delegate.matches? request
      end
    end

    class Collection
      def self.matches?(request)
        Dav::Collection === request.env['dav.resource']
      end
    end

    class Chain < Array

      def self.new(constraints)
        instance = super []
        instance.concat constraints
      end

      def matches?(request)
        all? { |constraint| constraint.matches? request }
      end

      def and_not(constraint)
        push Not.new(But.get(constraint))
        return self
      end

    end

    def self.get(name)
      case name
      when :propfind   then PROPFIND
      when :get        then GET
      when :put        then PUT
      when :mkcol      then MKCOL
      when :delete     then DELETE
      when :collection then Collection
      end
    end

    def self.only(*arguments)
      Chain.new arguments.map { |arg| get arg }
    end

  end

  Engine.routes.draw do

    root :to      => 'client#show', :via => 'get'

    root :to      => 'collections#survey', :constraints => But.only(:propfind, :collection)
    match '*path' => 'collections#survey', :constraints => But.only(:propfind, :collection)
    match '*path' => 'collections#create', :constraints => But.only(:mkcol, :collection)
    match '*path' => 'collections#delete', :constraints => But.only(:delete, :collection)

    match '*path' => 'resources#survey',   :constraints => But.only(:propfind)
    match '*path' => 'resources#show',     :constraints => But.only(:get).and_not(:collection)
    match '*path' => 'resources#store',    :constraints => But.only(:put).and_not(:collection)
    match '*path' => 'collections#delete', :constraints => But.only(:delete)

  end

end
