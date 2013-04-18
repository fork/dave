module Dav
  class Response < Struct.new(:content, :mount_point)

    def to_partial_path
      'response'
    end

    def href
      mount_point + content.relative_path
    end

    class OK < Response
      def status
        'HTTP/1.1 200 OK'
      end
    end

  end
end
