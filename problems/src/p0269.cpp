#include <iostream>

class S {
public:
    explicit operator int() const { return 1; }
};

int main() {
    S s;
    int x = s + 1;
    std::cout << x << '\n';
}
