#include <iostream>
#include <optional>

class S {
public:
    S() { std::cout << 'c'; }
    ~S() { std::cout << 'd'; }
};

int main() {
    std::optional<S> o;

    o.emplace();
    std::cout << 'x';
    o.reset();
    std::cout << 'y' << "\n";
}
