#include <memory>

struct S : std::enable_shared_from_this<S> {};

int main() {
    S s;
    s.shared_from_this();
}
