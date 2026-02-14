#include <iostream>
#include <string>

class S {
    const std::string& r;
public:
    S() : r(std::string("x")) {}
    const std::string& get() const { return r; }
};

int main() {
    S s;
    std::cout << s.get() << "\n";
}
