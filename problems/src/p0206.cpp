#include <iostream>

class S {
    int v = 1;
public:
    int get() const { return v; }
};

int main() {
    S s;
    std::cout << s.v << "\n";
}
